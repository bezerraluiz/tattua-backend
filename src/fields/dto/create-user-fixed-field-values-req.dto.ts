import type { UserFixedFieldValues } from "fields/fields.model";

export interface CreateUserFixedFieldValuesReqDto
  extends Pick<
    UserFixedFieldValues,
    | "user_id"
    | "fixed_field_id"
    | "custom_name"
    | "custom_value"
    | "custom_options"
  > {}
