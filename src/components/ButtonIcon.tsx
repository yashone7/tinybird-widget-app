import { Button } from "@/components/ui/button";
import { LucideIcon, LucideProps } from "lucide-react";
import { ReactNode } from "react";

interface ButtonIconProps {
  icon: React.FC<LucideProps>;
  iconProps: LucideProps;
}

export function ButtonIcon({ icon: Icon, iconProps }: ButtonIconProps) {
  return (
    <Button variant="outline" size="icon">
      <Icon {...iconProps} />
    </Button>
  );
}
