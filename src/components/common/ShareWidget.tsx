import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Copy, Link } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";

// interface ShareWidgetProps {
// id: string,
// }

function ShareWidget() {
  const { toast } = useToast();

  const copyLink2Clipboard = () => {
    const url: string = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      console.log("URL copied to clipboard!");
      toast({
        title: "Copied ✅",
        description: "link copied to clipboard",
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="open popup">
          <Link className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex w-full max-w-sm items-center justify-between space-x-2">
          <Input
            value={window.location.href}
            readOnly
            className="w-9/12"
            aria-label="url-textbox"
          />
          <Button
            size={"icon"}
            variant={"outline"}
            className="mx-2"
            onClick={copyLink2Clipboard}
            aria-label="copy link"
          >
            <Copy className="w-4 h-4" name="copy link" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ShareWidget;
