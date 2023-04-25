import { Timestamp } from "@angular/fire/firestore";

export interface Condition {
    id: string;
    title: string;
    conditionDate?: Timestamp;
}