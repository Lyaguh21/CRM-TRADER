import { Text } from "@mantine/core";
import { ReactNode } from "react";

export default function HeadlineText({ children }: { children: ReactNode }) {
  return (
    <Text fz={22} fw={600}>
      {children}
    </Text>
  );
}
