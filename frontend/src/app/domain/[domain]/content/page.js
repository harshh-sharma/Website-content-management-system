'use client'
import { useParams } from 'next/navigation';
import { getAllContentsRelatedToDomain } from '../../../../store/slices/contentSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../../components/ContentCard';

function Contents(){
    const {domain} = useParams(); 

    const contentLists = useSelector(store => store.contents.contents);
    console.log("contentLists",contentLists);
    
       const dispatch = useDispatch();
   
       const loadContents = async () => {
           await dispatch(getAllContentsRelatedToDomain(domain));
       }
       useEffect(() => {
        loadContents();
       }, [])

    return <div className='flex gap-5'>
       {
        contentLists.map((item,index) => <Card key={item?._id} content={item?.content} title={item?.title}/>)
       }
    </div>
}

export default Contents;