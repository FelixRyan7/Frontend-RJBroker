
import apiAsset from "../axiosAsset";
import apiWallet from "../axiosWallet";


export interface PlaceOrderPayload {
  tradeType: "buy" | "sell";
  assetId: number;
  price: number;
  assetSymbol: string;
  quantity: number;
}

//Función que obtiene assets según su tipo
export async function fetchAssetsByType(type : string) {
    const {data} = await apiAsset.get(`/api/assets/type/${type}`)
    return data
}

export async function fetchAllAssets() {
    const {data} = await apiAsset.get("/api/assets/all")
    return data
}

//Función que obtiene 1 asset según su id
export async function fetchAssetById(id:number){
    const {data} = await apiAsset.get(`/api/assets/${id}`)
    return data
}

//Función para mandar una peticion de compra o venta 
export async function placeOrder(payload: PlaceOrderPayload) {
  const { data } = await apiWallet.post("/api/portfolio/trade", payload);
  return data;
}

//Funcion para traer info de assets en portfolio
export async function fetchAssetsInfo(ids: number[]) {
  // enviamos los ids como query param o body
  const { data } = await apiAsset.post("/api/assets/Portfolio", { ids });
  return data; // devuelve AssetDTO[]
}