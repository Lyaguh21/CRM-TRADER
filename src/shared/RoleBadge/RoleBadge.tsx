import { Badge } from "@mantine/core";
import { Roles } from "../../entities/Roles";

export default function RoleBadge({ role }: { role: string }) {
  return (
    <Badge
      bg={Roles.find((el) => el.name === role)?.bgColor}
      c={Roles.find((el) => el.name === role)?.fontColor}
    >
      {Roles.find((el) => el.name === role)?.title}
    </Badge>
  );
}
