#!/usr/bin/env python3
import maude
import sys
import re


def init_arg(sasso):
    return f"{sasso} =|= e # 0"

def test_conversion(sasso):
    pa = maude.getModule("RULES")
    width = 17
    print(f"\n{'To convert:':<{width}} {sasso}")
    toMaude = pa.parseTerm(sasso)
    toMaude.reduce()
    print(f"{'Reduce:':<{width}} {toMaude}")
    toMaude = pa.parseTerm(sasso)
    toMaude.rewrite()
    print(f"{'Rewrite:':<{width}} {toMaude}")
    toMaude = pa.parseTerm(f"getTangle({str(toMaude)})")
    toMaude.reduce()
    print(f"{'Rewrite - reduce:':<{width}} {toMaude}")

def convert(sasso):
    pa = maude.getModule("RULES")
    toMaude = pa.parseTerm(sasso)
    toMaude.rewrite()
    toMaude = pa.parseTerm(f"getTangle({str(toMaude)})")
    toMaude.reduce()
    return str(toMaude)

def to_tangle(input):
    maude.init()
    maude.load('patt.maude')
    
    out: str = convert(init_arg(input))
    arr = [s.strip() for s in out.split('~')]
    # arr = [(i,i2) for i, v in enumerate(arr)]
    outlist = []
    for i,v in enumerate(arr):
        for k,z in enumerate(arr):
            if v == z and i<k:
                outlist.append((i+1,k+1))
    res = ','.join([f"{i}:{k}" for i,k in outlist])
    return res