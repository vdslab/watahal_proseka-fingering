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

import musicdata from "../public/musicdata.json";

const musics = musicdata.data;
const musicheader = musicdata.header;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e1bee7",
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
            {Object.values(musicheader).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {musics.map((music) => {
            return (
              <TableRow key={music.name} hover>
                {/* {Object.values(music).map((value) => (
                    <TableCell>{value}</TableCell>
                  ))} */}
                <TableCell>
                  <Link href={`/music/${music.name}`}>{music.name}</Link>
                </TableCell>
                <TableCell>{music.difficult}</TableCell>
                <TableCell>{music.time_sec}</TableCell>
                <TableCell>{music.bpm}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
