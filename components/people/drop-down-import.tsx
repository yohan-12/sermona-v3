"use client";
import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Download, FolderDown, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { importCSVFileData } from "@/lib/actions";
import { Label } from "../ui/label";

const memberFields = [
  "name",
  "familyHead",
  "address",
  "gender",
  "ssn",
  "birthday",
  "solarLunarType",
  "dutyInChurch",
  "cellGroup",
  "phone",
  "registeredDate",
  "notes",
];
type CsvDataRow = {
  [key: string]: string | null;
};
type HeaderMappings = Record<string, string>;

const ImportExportDropDown = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<CsvDataRow[]>([]);
  const [headerMappings, setHeaderMappings] = useState<Record<string, string>>(
    {}
  );

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      Papa.parse(file, {
        complete: (result) => {
          if (result.data.length > 0) {
            const headers = result.meta.fields ? result.meta.fields : [];
            setCsvHeaders(headers);
            const typedData: CsvDataRow[] = result.data.map((row) => {
              const typedRow: CsvDataRow = {};
              const objectRow = row as Record<string, any>;
              Object.keys(objectRow).forEach((key) => {
                typedRow[key] =
                  objectRow[key] === null ? null : String(objectRow[key]);
              });
              return typedRow;
            });
            setCsvData(typedData);
          }
        },
        header: true, // Set to true if your CSV has a header row, else set to false
        skipEmptyLines: true, // Skips empty lines in the CSV file
        dynamicTyping: true, // Automatically converts strings to numbers or booleans
        encoding: "EUC-KR",
      });
      event.target.value = "";
    }
  };
  const handleMappingChange = (csvHeader: string, modelField: string) => {
    setHeaderMappings((prev) => ({ ...prev, [csvHeader]: modelField }));
  };
  const transformCsvDataForSupabase = (
    csvData: CsvDataRow[],
    headerMappings: HeaderMappings
  ): any[] => {
    return csvData
      .map((row: CsvDataRow) => {
        let transformedRow: Record<string, any> = {};
        let isValidRow = false; // Flag to track if the row has at least one valid field

        Object.entries(row).forEach(([csvHeader, value]) => {
          const modelField = headerMappings[csvHeader];
          if (modelField && value !== null && value.trim() !== "") {
            transformedRow[modelField] = value.trim();
            isValidRow = true; // Mark row as valid if at least one field is non-empty after trimming
          }
        });

        return isValidRow ? transformedRow : null;
      })
      .filter((row) => row !== null);
  };

  const handleSubmit = async () => {
    const transformedData = transformCsvDataForSupabase(
      csvData,
      headerMappings
    );
    console.log(transformedData);
    await importCSVFileData(transformedData);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" asChild={true}>
              <div>
                <FolderDown className="mr-2 w-4 h-4" />
                파일 작업
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={triggerFileInput}>
              <Upload className="mr-2 w-4 h-4" />
              Import
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 w-4 h-4" />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogTrigger asChild>
          <Input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </DialogTrigger>
        {csvHeaders.length > 0 && (
          // <div>
          //   {csvHeaders.map((header) => (
          //     <div key={header}>
          //       <label>{header}: </label>
          //       <select
          //         onChange={(e) => handleMappingChange(header, e.target.value)}
          //       >
          //         <option value="">Skip</option>
          //         {memberFields.map((field) => (
          //           <option key={field} value={field}>
          //             {field}
          //           </option>
          //         ))}
          //       </select>
          //     </div>
          //   ))}
          //   <button onClick={handleSubmit}>Submit</button>
          // </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this file from our servers?
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              {csvHeaders.map((header) => (
                <div key={header}>
                  <Label>{header}: </Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="none">Skip</SelectItem>
                        {memberFields.map((field) => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Button onClick={handleSubmit}>Submit</Button>
            </div>

            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default ImportExportDropDown;
              {
                /* <select
                    onChange={(e) =>
                      handleMappingChange(header, e.target.value)
                    }
                  >
                    <option value="">Skip</option>
                    {memberFields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select> */
              }