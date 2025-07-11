"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { VerticalInputWithLabelWrapper } from "../VerticalInputWithLabelWrapper";
import { useEffect } from "react";

interface IEntry {
  label: string;
  value: string;
}

interface ComboBoxProps {
  initialValue?: string;
  entries: IEntry[];
  title?: string;
  onNewEntry?: (value: string) => void;
  onSelect: (value: string) => void;
}

export const ComboBox = ({
  entries,
  title,
  onNewEntry,
  onSelect,
  initialValue,
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);
  const input = React.useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = React.useState(true);

  useEffect(() => {
    setIsEmpty(true);
  }, [open]);

  return (
    <VerticalInputWithLabelWrapper>
      <label
        onClick={() => {
          setOpen(true);
        }}
        className="text-sm font-medium"
      >
        {title ? title : "Select an option"}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? entries.find((entry) => entry.value === value)?.label
              : "Select entry..."}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              ref={input}
              onChangeCapture={() => {
                setIsEmpty(input.current?.value.trim() == "");
              }}
              placeholder="Search entry..."
            />
            <CommandList>
              {!isEmpty && (
                <CommandEmpty className="p-2 items-center flex flex-col">
                  {onNewEntry ? (
                    <Button
                      className="cursor-pointer"
                      onClick={() => {
                        const inputValue = input.current?.value.trim();
                        if (!inputValue) return;
                        onNewEntry(inputValue);
                      }}
                    >
                      <Plus /> Create new entry
                    </Button>
                  ) : (
                    "No entries found"
                  )}
                </CommandEmpty>
              )}

              <CommandGroup>
                {entries.map((entry) => (
                  <CommandItem
                    key={entry.value}
                    value={entry.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      onSelect(currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === entry.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {entry.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </VerticalInputWithLabelWrapper>
  );
};
