"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllDomains } from "../../store/slices/domainSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";

export default function WebsitesDomain() {
  const [activeTab, setActiveTab] = useState("content");
  const domainLists = useSelector(store => store.websites.domains);
 console.log("domainLists",domainLists);
 
    const dispatch = useDispatch();

    const loadDomains = async () => {
        await dispatch(getAllDomains());
    }
    useEffect(() => {
        loadDomains();
    }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex gap-5 flex-wrap">
      {
        domainLists?.map((item,index) => <Card key={item?.domain} websiteName={item?.name} domain={item?.domain} domainId={item?._id}/>)
      }
    </div>
  );
}
