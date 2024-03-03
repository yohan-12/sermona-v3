"use client";
import { useRef, useState } from "react";
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
import { DialogClose } from "@radix-ui/react-dialog";
import { createBrowserClient } from '@supabase/ssr'
import { create } from "domain";

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
  const resetImportState = () => {
    setCsvHeaders([]);
    setCsvData([]);
    setHeaderMappings({});
  };
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
        let isValidRow = false; 
        Object.entries(row).forEach(([csvHeader, value]) => {
          const modelField = headerMappings[csvHeader];
          if (modelField && value !== null && value.trim() !== "") {
            transformedRow[modelField] = value.trim();
            isValidRow = true;
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
     resetImportState();
  };

  const triggerFileInput = () => {
      fileInputRef.current?.click();
  };

  //! Export function
  const handleExport = (memberData: CsvDataRow[], fileName:string) => {
      const csvString = Papa.unparse(memberData);
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.csv`;
      document.body.appendChild(link); // Necessary for Firefox
      link.click();
      document.body.removeChild(link); // Clean up
      URL.revokeObjectURL(link.href);
  }
  const handleExportClick = async () => {
    const fileName = prompt("파일 이름을 임력해 주세요:", "교적부")
    if(fileName){
      const { data: member, error } = await supabase
        .from("member")
        .select("*")
        .order("created_at");
     if(error){
          console.error("err in fetching member data", error);
          throw new Error("Error in fetching members");
     }
      handleExport(member, fileName)
    }
  }


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
            <DropdownMenuItem onSelect={handleExportClick}>
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
          <DialogContent className="max-w-2xl">
            <DialogHeader className="space-y-3 p-4">
              <DialogTitle className="text-center">
                파일 헤더 정보 설정
              </DialogTitle>
              <DialogDescription className="text-center">
                파일 헤더 정보를 데이타베이스 정보와 동기화 시키기
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-2 mx-auto">
              {csvHeaders.map((header) => (
                <div key={header}>
                  <Label>{header}: </Label>
                  <Select
                    onValueChange={(value) =>
                      handleMappingChange(header, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="파일 헤더 매핑" />
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
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <div>
                <Button type="button" variant="outline" onClick={resetImportState}>
                  Close
                </Button>
                <Button onClick={handleSubmit}>확인</Button>
                </div>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default ImportExportDropDown;
