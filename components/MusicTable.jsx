"use client";
import * as React from "react";
import Link from "next/link";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function onclick(event) {
  console.log(event.currentTarget.value);
}

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
            <StyledTableCell>
              曲名
              <IconButton onClick={onclick} value="name">
                <ArrowDropDownIcon color="primary" fontSize="large" />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell>
              難易度
              <IconButton onClick={onclick} value="level">
                <ArrowDropDownIcon color="primary" fontSize="large" />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell>
              曲の長さ
              <IconButton onClick={onclick} value="sec">
                <ArrowDropDownIcon color="primary" fontSize="large" />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell>
              BPM
              <IconButton onClick={onclick} value="bpm">
                <ArrowDropDownIcon color="primary" fontSize="large" />
              </IconButton>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ name, level, sec, bpm }) => {
            return (
              <TableRow key={name} hover>
                {/* {Object.values(music).map((value) => (
                    <TableCell>{value}</TableCell>
                  ))} */}
                <TableCell>
                  <Link href={`/music/${name}`}>{name}</Link>
                </TableCell>
                <TableCell>{level}</TableCell>
                <TableCell>{sec}</TableCell>
                <TableCell>{bpm}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
