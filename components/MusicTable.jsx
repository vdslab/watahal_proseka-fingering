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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#e1bee7",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function MusicTable({ data, header }) {
  const cell = "px-4 py-2";
  const smallCell = `${cell} w-1/12`;
  const dataCell = `border ${cell}`;
  const smallDataCell = `border ${smallCell} text-center`;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {Object.values(header).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ name, difficult, time_sec, bpm }) => {
            return (
              <TableRow key={name} hover>
                {/* {Object.values(music).map((value) => (
                    <TableCell>{value}</TableCell>
                  ))} */}
                <TableCell>
                  <Link href={`/music/${name}`}>{name}</Link>
                </TableCell>
                <TableCell>{difficult}</TableCell>
                <TableCell>{time_sec}</TableCell>
                <TableCell>{bpm}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
