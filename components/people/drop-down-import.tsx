"use client";
import { useRef } from "react";
import { useCSVReader, formatFileSize} from 'react-papaparse'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FolderDown, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const ImportExportDropDown = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
  //   event
  // ) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0]
  //     Papa.parse(file, {
  //       complete: (result) => {
  //         console.log("Parsed Result:", result.data);
  //         // Process the parsed data here
  //         // For example, you could set state with the parsed data,
  //         // send it to a backend server, or display it in the UI
  //       },
  //       header: true, // Set to true if your CSV has a header row, else set to false
  //       skipEmptyLines: true, // Skips empty lines in the CSV file
  //       dynamicTyping: true, // Automatically converts strings to numbers or booleans when possible
  //       encoding: "EUC-KR",
  //     });

  //     event.target.value = "";
  //   }
  // };

  const triggerFileInput = () => {
    // Programmatically click the hidden file input
    fileInputRef.current?.click();
  };
  return (
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
      <Input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        // onChange={handleFileChange}
        multiple // Optional: remove if only single file upload is required
      />
    </DropdownMenu>
  );
};

export default ImportExportDropDown;
