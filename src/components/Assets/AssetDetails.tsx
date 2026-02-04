import React from 'react'
import type { Asset, AssetDetailsDto } from '../../@types/assets'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchAssetById } from '../../api/peticiones/assets';

type AssetDetailsProps = {
  id: number;
  onBack: () => void;
};

export default function AssetDetails({id , onBack}: AssetDetailsProps ) {

    if (!id) return;

 //   const { data, isLoading, isError } = useQuery<AssetDetailsDto>({
 //   queryKey: ["asset", id],
 //   queryFn: () => fetchAssetById(Number(id)),
 //   staleTime: 60_000,
 //  });

 //  if(isLoading) return <h1>Is Loading...</h1>
 //  if(isError) return <h1>Error </h1>
  return (
    <>
    
    <div className='absolute  bg-white2 z-30 top-0 left-0 w-full mt-20'>
    <div>{id}</div>
    <div onClick={onBack}>volver</div>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    <h1>fselnf</h1>
    <h1>dawejldnaj</h1>
    </div>
    </>
  )
}
