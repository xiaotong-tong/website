import * as dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";

dayjs.extend(dayOfYear);

export { dayjs as default, dayjs };
