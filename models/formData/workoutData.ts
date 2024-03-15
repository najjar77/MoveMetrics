import type {GeneralInformation} from "~/models/formData/generalInformation";
import type {FeedbackInformation} from "~/models/formData/feedbackInformation";
import type {SuppIntakeInfo} from "~/models/formData/suppIntakeInfo";
import type {CyclingInformation} from "~/models/formData/cyclingInformation";
import type {SaunaInformation} from "~/models/formData/saunaInformation";
import type {GymInformation} from "~/models/formData/gymInformation";

export interface WorkoutData {
    id?: string;
    generalInformation?: GeneralInformation;
    feedbackInformation?: FeedbackInformation;
    suppIntakeInfo?: SuppIntakeInfo;
    cyclingInformation?: CyclingInformation;
    saunaInformation?: SaunaInformation;
    gymInformation?: GymInformation;
}
