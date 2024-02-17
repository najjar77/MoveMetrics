import type {GeneralInformation} from "~/models/formData/generalInformation";
import type {FeedbackInformation} from "~/models/formData/feedbackInformation";
import type {SupplementsIntakeInformation} from "~/models/formData/supplementsIntakeInformation";
import type {CyclingInformation} from "~/models/formData/cyclingInformation";
import type {SaunaInformation} from "~/models/formData/saunaInformation";

export interface WorkoutData {
    generalInformation?: GeneralInformation;
    feedbackInformation?: FeedbackInformation;
    supplementsIntakeInformation?: SupplementsIntakeInformation;
    cyclingInformation?: CyclingInformation;
    saunaInformation?: SaunaInformation;
}