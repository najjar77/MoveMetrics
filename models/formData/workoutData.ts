import type {GeneralInformation} from "~/models/formData/generalInformation";
import type {FeedbackInformation} from "~/models/formData/feedbackInformation";
import type {SuppIntakeInfo} from "~/models/formData/suppIntakeInfo";
import type {CyclingInformation} from "~/models/formData/cyclingInformation";
import type {SaunaInformation} from "~/models/formData/saunaInformation";

export interface WorkoutData {
    id?: string;
    generalInformation?: GeneralInformation;
    feedbackInformation?: FeedbackInformation;
    suppIntakeInfo?: SuppIntakeInfo;
    cyclingInformation?: CyclingInformation;
    saunaInformation?: SaunaInformation;
}

export interface TableDisplayWorkout {
    name: string;
    date: string; // or Date, depending on how you wish to handle it
    // Add other fields here as needed for display
}