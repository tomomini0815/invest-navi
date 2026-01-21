import { cryptoRankingList } from "@/pages/CryptoComparison";
import CryptoDetailTemplate from "@/components/templates/CryptoDetailTemplate";
import { Navigate } from "react-router-dom";

const BitflyerDetailed = () => {
  const companyData = cryptoRankingList.find(c => c.id === "bitflyer");

  if (!companyData) {
    return <Navigate to="/crypto-comparison" replace />;
  }

  return <CryptoDetailTemplate company={companyData} />;
};

export default BitflyerDetailed;