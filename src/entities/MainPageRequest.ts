import { ReactNode } from "react";

export type boxOffice = {
  name: string;
  count: number;
  icon: ReactNode;
};

export type dataInterface = {
  role: string;
  countActiveApplications: number;
  boxOffice: boxOffice[];
};
