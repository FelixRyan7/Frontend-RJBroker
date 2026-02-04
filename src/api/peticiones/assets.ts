import type { AssetDetailsDto } from "../../@types/assets";
import AssetDetails from "../../components/Assets/AssetDetails";
import apiAsset from "../axiosAsset";

//Función que obtiene assets según su tipo
export async function fetchAssetsByType(type : string) {
    const {data} = await apiAsset.get(`/api/assets/type/${type}`)
    console.log(data)
    return data
}

export async function fetchAssetById(id:number){
    const {data} = await apiAsset.get(`/api/assets/${id}`)
    console.log(data)
    return data
}