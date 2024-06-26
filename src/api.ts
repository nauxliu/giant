import axios from "axios";
import FormData from "form-data";
import type {
  SkuStockResponse,
  ShopListOptions,
  ShopListResponse,
  RefreshTokenResponse,
} from "./types";

export async function getSkuStock(sku: string, shopno: string, userId: string) {
  const formData = new FormData();
  formData.append("sku", sku);
  formData.append("shopno", shopno);
  formData.append("user_id", userId);
  formData.append("user_long", '116.48912625976562');
  formData.append("user_lat", '39.99944331298828');

  const resp = await axios.post(
    "https://e-gw.giant.com.cn/index.php/api/sku_stock",
    formData
  );
  return resp.data as SkuStockResponse;
}

export async function switchStore(userId: string, shopno: string) {
  const formData = new FormData();
  formData.append("code", shopno);
  formData.append("user_id", userId);

  const resp = await axios.post(
    "https://e-gw.giant.com.cn/index.php/api/do_store",
    formData
  );
  return resp.data as SkuStockResponse;
}

export async function getShopList(page: number, options: ShopListOptions) {
  const { province, city, area, perPage = 10 } = options;
  const formData = new FormData();
  if (province) {
    formData.append("province", province);
  }
  if (city) {
    formData.append("city", city);
  }
  if (area) {
    formData.append("area", area);
  }
  formData.append("per_page", perPage.toString());
  formData.append("page", page.toString());
  formData.append("user_long", '116.48912625976562');
  formData.append("user_lat", '39.99944331298828');

  const resp = await axios.post(
    "https://e-gw.giant.com.cn/index.php/api/store_list",
    formData
  );
  return resp.data as ShopListResponse;
}

export async function refreshToken(token: string) {
  const formData = new FormData();
  formData.append('token', token);

  const resp = await axios.post(
    "https://e-gw.giant.com.cn/index.php/login/refresh_token",
    formData
  )
  return resp.data as RefreshTokenResponse;
}
