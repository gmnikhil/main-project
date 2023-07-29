import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/Navbar";
import requestHandler from "../utils/requestHandler";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { currentUser, token, currentCompany } = useContext(AuthContext);
  const [chartData, setChartData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };
  async function fetchSearches() {
    requestHandler("GET", "/api/analytics", {}, token)
      .then((r: any) => {
        console.log(r.data.searchTerms);
        setChartData({
          labels: r.data.searchTerms.map((item: any) => item._id),
          datasets: [
            {
              label: "Search Count",
              data: r.data.searchTerms.map(
                (item: any) => item.documents.length
              ),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (currentUser || currentCompany) {
      fetchSearches();
    }
  }, [currentUser, currentCompany]);

  return (
    <>
      <Navbar className="fixed w-full bg-white" />
      <h1 className="text-3xl pt-20 font-semibold text-center">
        Search Analytics
      </h1>
      <div className="flex justify-evenly items-center mt-10">
        <div className="w-96">
          {chartData && (
            <Bar width={20} height={20} data={chartData} options={options} />
          )}
        </div>
        <div className="w-96">
          {chartData && <Pie width={20} height={20} data={chartData} />}
        </div>
      </div>
    </>
  );
}
