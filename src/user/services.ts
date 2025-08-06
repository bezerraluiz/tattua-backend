import { supabase } from "server";
import { CreateUserReqDto } from "./dtos/create-user-req.dto";

export const GetUsers = async () => {
    const { data, error } = await supabase
        .from('users')
        .select();
};

export const CreateUser = async (user: CreateUserReqDto) => {
    const { error } = await supabase
        .from('users')
        .insert({
            uid: user.uid,
            studioName: user.studioName,
            cpfcnpj: user.cpfcnpj,
            password: user.password,
            valueCm: user.valueCm,
            valueNeedle: user.valueNeedle,
            addressId: user.addressId,
        })
};
