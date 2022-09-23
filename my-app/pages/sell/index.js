import { useMoralis, useWeb3Contract, useMoralisQuery } from "react-moralis"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import NFTBox2 from "../../components/NFTBox2";
import { List } from "web3uikit";

// get user NFT list DONE
// show user nft list
// allow withdrawals



export default function Profile() {
    //set Moralis Hooks and state variables
    const { logout, user, Moralis, isWeb3Enabled } = useMoralis()
    const [ account, setAccount ] = useState()
    const [ isOwner, setIsOwner] = useState()


    const { data: ListedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "MintedItems",
        (query) => query.limit(10).ascending("tokenId")
    ) 
    console.log(ListedNfts) 

    
    useEffect(() => {
        if(isWeb3Enabled) {
           setAccount(String(user.get('ethAddress')))
        }
    }, [isWeb3Enabled])


    return (
        <div className="w-screen h-full bg-black flex flex-wrap flex-row">
            <Navbar />
            {fetchingListedNfts ? <div>Loading...</div> : ListedNfts.map((nft) => {
                    console.log(nft.attributes)
                    const { price, nftAddress, tokenId, marketplaceAddress, seller } = nft.attributes
                    return ( 
                        <div key={`${nftAddress}${tokenId}`} className="w-screen h-full bg-black flex flex-wrap">
                            { seller == account ? 
                            <NFTBox2 
                                price={price}
                                tokenId={tokenId}
                                nftAddress={nftAddress}
                                marketplaceAddress={marketplaceAddress}
                                seller={seller}
                                key={`${nftAddress}${tokenId}`}
                            /> : <div className="w-screen h-screen bg-black" key={`${nftAddress}${tokenId}`}></div> }
                        </div>
                    )
                } ) } 
            <Footer/>
        </div>
    )
} 