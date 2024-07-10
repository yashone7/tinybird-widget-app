import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  heading: string;
  content: string | undefined;
  icon: ReactNode;
}

export default function StatCard({ heading, content, icon }: StatCardProps) {
  return (
    <Card className="max-w-[350px] min-w-[250px]" id="test">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{heading}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-zinc-700">{content}</div>
      </CardContent>
    </Card>
  );
}
