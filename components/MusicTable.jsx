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

const musics = [
  { name: "one", difficult: 1, time_sec: 300, bpm: 200 },
  { name: "two", difficult: 2, time_sec: 290, bpm: 210 },
  { name: "three", difficult: 3, time_sec: 280, bpm: 220 },
  { name: "four", difficult: 4, time_sec: 270, bpm: 230 },
  { name: "five", difficult: 5, time_sec: 260, bpm: 240 },
];
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
              <TableRow key={music.name}>
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
