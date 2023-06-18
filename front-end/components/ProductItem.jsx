import Link from "next/link";
import React from "react";
import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Image from "next/image";

export default function ProductItem({ product }) {
  const theme = createTheme({
    components: {
      MuiRating: {
        styleOverrides: {
          root: {
            "& .MuiRating-iconEmpty": {
              color: "white",
            },
          },
        },
      },
    },
  });

  return (
    <div key={product.slug} className="flex flex-col w-fit rounded-t-3xl">
      <Link href={`/product/${product.slug}`}>
        <div className="xl:w-[450px] xl:h-[350px] lg:w-[430px] lg:h-[330px] md:w-[400px] md:h-[300px] sm:w-[380px] sm:h-[280px] xs:w-[330px] xs:h-[230px] rounded-3xl bg-white">
          {/* <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-3xl mb-3"
          ></Image> */}
          <img
            src={product.image}
            alt={product.name}
            className="rounded-3xl mb-3"
          />
        </div>
      </Link>
      <div className="flex flex-col text-white justify-center items-center xl:mt-5 lg:mt-8 md:mt-9 sm:mt-10 xs:mt-12 space-y-1">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-lg font-medium">${product.price}</p>

        <ThemeProvider theme={theme}>
          <Box className="flex flex-row space-x-2 ms-[2.5rem] ">
            <Rating
              name="simple-controlled"
              value={product.rating}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              className="custom-rating-outline"
            />
            <Typography component="legend" className="text-gray-200">
              ({product.numReviews})
            </Typography>
          </Box>
        </ThemeProvider>
      </div>
    </div>
  );
}
