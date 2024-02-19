import { ref } from 'vue';
import address from '@/utils/address.js';
import { RegisterShop, ShopIDResponseData } from '@/api/shop/type';
import { reqAddShop } from '@/api/shop';
import { formRef, addRegisterShop, selectedOption1, selectedOption2, selectedOption3, sellShopStore, $router } from './index.vue';

export const save = async () => {
await formRef.value.validate();

const registerShop = ref<RegisterShop>({
captcha: addRegisterShop.value.captcha,
shopName: addRegisterShop.value.name,
phone: addRegisterShop.value.phone,
description: addRegisterShop.value.description,
addressId: address[selectedOption1.value].areas[selectedOption2.value].streets[selectedOption3.value].streetKey,
addressDetail: addRegisterShop.value.address.detail as string,
});

let res: ShopIDResponseData = await reqAddShop(registerShop.value);
if (res.code === 200)
sellShopStore.shopId = res.data;
$router.push(`/sell/${res.data}/Shop`);
}, {
ElMessage };
