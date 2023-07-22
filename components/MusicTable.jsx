"use client";
import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { useRouter } from "next/navigation";

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

export default function MusicTable({ data }) {
  const cell = "px-4 py-2";
  const smallCell = `${cell} w-1/12`;
  const dataCell = `border ${cell}`;
  const smallDataCell = `border ${smallCell} text-center`;

  const [showdata, setShowdata] = useState(data);

  useEffect(() => {
    setShowdata(data);
  }, [data]);

  function onclick(event) {
    const value = event.currentTarget.value;
    setShowdata([
      ...showdata.sort((a, b) => {
        if (a[`${value}`] < b[`${value}`]) {
          return -1;
        } else if (a[`${value}`] > b[`${value}`]) {
          return 1;
        } else {
          return 0;
        }
      }),
    ]);
  }

  const router = useRouter();
  return (
    <TableContainer className="max-h-[60vh]">
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <div className="flex items-center justify-items-center">
                <p>曲名</p>
                <IconButton onClick={onclick} value="name">
                  <ArrowDropDownIcon color="primary" fontSize="large" />
                </IconButton>
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="flex flex-row items-center justify-items-center">
                <p className="hidden w-0 sm:w-auto sm:inline basis-3/4 text-center">
                  難易度
                </p>
                <IconButton
                  onClick={onclick}
                  value="level"
                  className="basis-1/4"
                >
                  <ArrowDropDownIcon color="primary" fontSize="large" />
                </IconButton>
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="flex flex-row items-center justify-items-center">
                <p className="hidden w-0 sm:w-auto sm:inline basis-3/4 text-center">
                  曲の長さ
                </p>
                <IconButton onClick={onclick} value="sec">
                  <ArrowDropDownIcon color="primary" fontSize="large" />
                </IconButton>
              </div>
            </StyledTableCell>
            <StyledTableCell>
              <div className="flex flex-row items-center justify-items-center">
                <p className="hidden w-0 sm:w-auto sm:inline basis-3/4 text-center">
                  BPM
                </p>
                <IconButton onClick={onclick} value="bpm">
                  <ArrowDropDownIcon color="primary" fontSize="large" />
                </IconButton>
              </div>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showdata.map(({ name, level, sec, bpm, videoid }) => {
            return (
              <TableRow
                key={name}
                hover
                onClick={() => router.push(`/music/${videoid}`)}
              >
                <TableCell>{name}</TableCell>
                <TableCell className="text-center">{level}</TableCell>
                <TableCell className="text-center">{sec}</TableCell>
                <TableCell className="text-center">{bpm}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
