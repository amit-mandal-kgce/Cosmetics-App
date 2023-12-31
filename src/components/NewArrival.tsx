"use client"
import React, { useEffect, useState } from 'react'
import Data from '@/utils/productData'
import ProductCard from '@/components/ProductCard'
import { Iproduct } from '@/components/ProductCard'


const tapdata = ["All", "Casual", "Formal", "Jeans", "Tshart"]

const NewArrival = () => {
    const [selectedTab, setSelectedTab]=useState(0)

    const [data, setData]=useState([])

    const shaffleArray = (array: any) => {
        return array
        .map((value: any)=>({value, sort: Math.random()}))
        .sort((a: any, b: any)=>a.sort - b.sort)
        .map(({value}: any) => value)
    }

    useEffect(() => {
        setData(shaffleArray(Data).slice(0, 16))
    }, [])

    const handleTab = (index: number) =>{
        const category = tapdata[index].toLowerCase();
        setSelectedTab(index);
        if(category === "all"){
            setData(shaffleArray(Data).slice(0, 28));
            return;
        }
        const filterData = Data.filter((item) => item.category.includes(category));
        setData(shaffleArray(filterData))
    }

  return (
    <div className="container pt-32">
        <div className="text-center">
            <h2 className="font-semibold text-5xl">New Arrival</h2>
            <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center pt-8 uppercase font-medium text-xl">
                {tapdata.map((text, index)=><li key={text} className={`${selectedTab === index && "text-accent"} cursor-pointer hover:text-accent`}
                onClick={()=>handleTab(index)}
                >{text}</li>)}
            </ul>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-8">
                {data.map((item: Iproduct) => <ProductCard
                key={item.id}
                id={item.id} 
                img={item.img} 
                name={item.name} 
                price={item.price} 
                sale={item.sale}
                />)}
            </div>
        </div>
    </div>
  )
}

export default NewArrival
