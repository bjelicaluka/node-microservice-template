import { Location } from "./Location";

interface RecordType {
  [key: string]: string;
}

export interface Sensor {
  id: string;
  name: string;
  location?: Location;
  recordType?: RecordType;
};