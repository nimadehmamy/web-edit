import urllib2
from pylab import * #if you have matplotlib, scipy and numpy
#otherwise just load scipy:
#from scipy import *
import pandas as pd


def Yurl(tck , Int='d', datei='2005-04-20', datef='2014-04-20'):
    """tck= one ticker symbol; Int=period: d=daily, w=weekly, m=monthly."""
    return 'http://ichart.yahoo.com/table.csv?s='+tck+ \
                        '&a='+str(int(datei[5:7])-1)+'&b='+datei[-2:]+'&c='+datei[:4]+\
                        '&d='+str(int(datef[5:7])-1)+'&e='+datef[-2:]+'&f='+datef[:4]+\
                        '&g='+Int+'&ignore=.csv'


def GetStock(tck, Int='d', datei=fromDate, datef=toDate, out=1, save_path=''):
    """tck= ticker or list of ticker symbol; Int=period: d=daily, w=weekly, m=monthly."""
    if type(tck)==str: #If there was just one entry, we have a string. 
        tck=[tck] #Make it a list, for compatibility with the rest
    for i in tck: #for more than one stock, we have a listof tickers.
            stocks=[]
            try:
                
                u=urllib2.urlopen(Yurl(tck =i,Int=Int, datei=datei,datef=datef))
                fname=save_path+i+"("+Int+"),("+datei+")-("+datef+").csv"
                #if os.path.isfile(fname): mode='rw'
                #else: mode='a+'
                mode='w+'
                f= open(fname,mode)
                f.write(u.read())
                f.seek(0)
                a=f.readline()
                a=a.replace(' ','_')
                f.seek(0)
                f.writelines(a)
                f.write('')
                f.close()
                if out: stocks+=[pd.read_csv(fname)]
            except urllib2.HTTPError: print "Ticker %s not found!! Skipping..." % i
    return stocks
    
#Some extra goodies for adding missing dates, 
#removing the date column,
#sorting data in ascending order,
#and returning just a data numpy array

def FillPrices(Yfile, datei=fromDate, datef=toDate):
    """Takes Y!Finance csv read in pandas. Outs Adj Close with missing dates filled with previous days.
    """
    #1. convert dates to nums with datei -> 0
    dats=int0([datestr2num(s)-datestr2num(datei) for s in Yfile.values[::-1,0]if s!=datef])
    temp=array([0.]*int(datestr2num(datef)-datestr2num(datei)))
    temp[dats]=Yfile.values[::-1,-1]
    for i in range(1,int(datestr2num(datef)-datestr2num(datei))-1):
        if (temp[i]==0.) & (temp[i-1]!=0.): temp[i]=temp[i-1]
    return temp

def FillY(Yfile, datei=fromDate, datef=toDate):
    """Takes Y!Finance csv read in pandas. Outs Adj Close with missing dates filled with previous days.
    """
    #1. convert dates to nums with datei -> 0
    dats=int0([datestr2num(s)-datestr2num(datei) for s in Yfile.values[::-1,0]])#if s!=datef])
    temp=array([[0.]*(Yfile.columns.size-1)]*int(datestr2num(datef)-datestr2num(datei)+1))
    #print temp.shape
    #print Yfile.values[::-1,1:].shape
    #print dats.shape
    temp[dats]=float64(Yfile.values[::-1,1:])
    for i in range(1,int(datestr2num(datef)-datestr2num(datei))):
        if (float64(temp[i])==zeros(Yfile.columns.size-1)).any() &\
        (float64(temp[i-1])!=zeros(Yfile.columns.size-1)).any(): temp[i]=temp[i-1]
    return temp
