import { Drawer, Skeleton } from '@mui/material';
import * as React from 'react';
import nike from '../../assets/nike.png'
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
//import { useGetAllShoesQuery } from '../../redux/api/shoeApi';
import SearchCard from '../cards/Searchcard';
import { staleData } from '../../pages/ItemDetails/detailsData/detailsData';

export interface ISearchDrawerProps {
    state:boolean,
    change: React.Dispatch<React.SetStateAction<boolean>>
    searchState: string
    setSearchState:React.Dispatch<React.SetStateAction<string>>
}

export default function SearchDrawer ({state,change,searchState,setSearchState}: ISearchDrawerProps) {
    const naviagte = useNavigate()
    //const {data,error,isFetching} = useGetAllShoesQuery()
    const [loading,setLoading] = React.useState(false)

    const searchedData = searchState ? staleData.filter((item:any) => item.name.toLowerCase().includes(searchState.toLowerCase())).slice(0,5) : null

    
  return (
    <Drawer anchor='top' onClose={()=>{
        change(false)
        setSearchState("")
    }} open={state}>
        <div className='w-full min-h-[450px] bg-white pb-5'>
            {/* Desktop Content */}
            <div className='lg:flex hidden flex-col w-full h-full px-5'>

                {/* First Box WIth Search Bar */}
                <div className='flex w-full justify-between items-center'>
                    {/* Nike Icon */}
                    <div onClick={()=>{
                        change(false)
                        naviagte("/")
                        setSearchState("")
                    }}>
                        <img src={nike} alt="" className='w-[70px]'/>
                    </div>

                    {/* Search Bar */}
                    <div className='flex items-center bg-gray-200 rounded-2xl lg:w-[55%] xl:w-[45%] 2xl:w-[45%] h-[40px] hover:bg-gray-100'>
                        <SearchIcon className='mx-2'/>
                        <input type="text" placeholder='Search' value={searchState} onChange={(e)=>{
                            setLoading(true)
                            setSearchState(e.target.value)
                            setLoading(false)
                        }} className=' outline-none bg-inherit indent-1 w-full rounded-2xl '/>
                    </div>

                    {/* Cancel Text */}
                    <h1 className=' font-semibold cursor-pointer hover:underline' onClick={()=>{
                        change(false)
                        setSearchState("")
                    }}>Cancel</h1>
                </div>
                
                {/* Data */}
                <div className='flex w-full h-full justify-center mt-10'>
                    <motion.div initial={{ x: 600 }} animate={{ x: 0 }} className='flex flex-col w-[20%]'>
                        <h1 className='text-gray-400 font-medium'>Popular Search Terms</h1>

                        <div className='flex flex-col w-full'>
                            <h1 className='text-black my-1 font-semibold text-[20px]'>Air Force 1</h1>
                            <h1 className='text-black my-1 font-semibold text-[20px]'>Jordan</h1>
                            <h1 className='text-black my-1 font-semibold text-[20px]'>Air Max</h1>
                            <h1 className='text-black my-1 font-semibold text-[20px]'>Blazer</h1>

                        </div>

                    </motion.div>

                    <div className='w-[80%] h-full grid grid-cols-5'>
                        {
                        loading ? 
                        (
                            <div className='w-[200px] flex flex-col'>
                            <Skeleton variant="rectangular" height={200} />
                            <div className='mt-2'>
                                <Skeleton variant='rectangular' height={35} />
                            </div>

                            <div className='my-1'>
                                <Skeleton variant='rectangular' height={20} />
                            </div>

                            <div className='my-2'>
                                <Skeleton variant='rectangular' height={20} />
                            </div>
                        </div>
                        )
                        : 
                        (
                            searchedData?.map((item:any,index:any)=>(
                                <SearchCard item={item} change={change} setState={setSearchState}/>
                            ))
                        )
                        }

                        
                    </div>
                </div>
                
            </div>

            {/* ------------------------------------------------------------------------------------------------------------------------- */}

            {/* Mobile Content */}
            <div className='flex lg:hidden flex-col w-full h-full px-5 pt-2'>
                
                {/* First Box WIth Search Bar */}
                <div className='flex w-full items-center justify-between'>

                    {/* Search Bar */}
                    <div className='flex items-center bg-gray-200 rounded-2xl w-[90%] h-[40px] hover:bg-gray-100'>
                        <SearchIcon className='mx-2 ' />
                        <input type="text" placeholder='Search' value={searchState} onChange={(e)=>setSearchState(e.target.value)} className=' outline-none bg-inherit indent-1 w-full rounded-2xl '/>
                    </div>

                    {/* Cancel Text */}
                    <h1 className=' font-semibold cursor-pointer hover:underline' onClick={()=>{
                        change(false)
                        setSearchState("")
                    }}>Cancel</h1>

                </div>

                {/* Data */}
                <div>

                </div>
            </div>
        </div>
    </Drawer>
  );
}
