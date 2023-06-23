"use client";
import * as React from "react";
import Link from "next/link";
import {
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
} from "@mui/material";

import { styled } from "@mui/material/styles";

const musics = [
  { name: "砂の惑星", difficult: 27, time_sec: "2:11", bpm: 95 },
  { name: "雨のペトラ", difficult: 29, time_sec: "2:01", bpm: 195 },
  { name: "いーあるふぁんくらぶ", difficult: 28, time_sec: "2:01", bpm: 145 },
  { name: "心予報", difficult: 28, time_sec: "2:09", bpm: 143 },
  {
    name: "ルカルカ★ナイトフィーバー",
    difficult: 29,
    time_sec: "2:12",
    bpm: 160,
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function MusicTable() {
  const cell = "px-4 py-2";
  const smallCell = `${cell} w-1/12`;
  const dataCell = `border ${cell}`;
  const smallDataCell = `border ${smallCell} text-center`;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(musics[0]).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {musics.map((music) => {
            return (
              <StyledTableRow key={music.name}>
                {/* {Object.values(music).map((value) => (
                    <TableCell>{value}</TableCell>
                  ))} */}
                <TableCell>
                  <Link href={`/music/${music.name}`}>{music.name}</Link>
                </TableCell>
                <TableCell>{music.difficult}</TableCell>
                <TableCell>{music.time_sec}</TableCell>
                <TableCell>{music.bpm}</TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
