"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  desc: string;
  link: string;
  img: StaticImageData;
};

const MenuCard = (props: Props) => {
  let blank = props.link.includes("http")
  return (
    <>
      <Link href={props.link} legacyBehavior>
        <a target={`${blank?"_blank":""}`} rel="noreferrer">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent className="flex flex-col justify-center items-center gap-3">
                <div className="flex justify-center">
                  <Image src={props.img} alt="img" width={100} height={100} />
                </div>
                <Typography className=" text-sm md:text-xl text-center font-bold text-purple-950 capitalize">
                  {props.title}
                </Typography>
                <Typography className="text-[8px] md:text-sm text-center text-slate-400">
                  {props.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </a>
      </Link>
    </>
  );
};

export default MenuCard;