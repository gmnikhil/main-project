import { NFTStorage, File } from "nft.storage";

async function storeNFT(image: any, name: any, description: any) {
  //const image = await fileFromPath(imagePath);

  const nftstorage = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY!,
  });

  return nftstorage.store({
    image,
    name,
    description,
  });
}

export async function storeFile(image: any, name: any, description: any) {
  try {
    const result = await storeNFT(image, name, description);
    return { success: true, data: result };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
}
