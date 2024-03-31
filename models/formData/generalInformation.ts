export interface GeneralInformation {
  name: string;
  date: Date;
  activities: {
    name: string;
    value: string;
    icon: string;
  }[];
}
