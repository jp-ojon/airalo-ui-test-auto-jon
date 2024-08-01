import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'

interface TestData {
    country: string
    title: string
    coverage: string
    data: string
    validity: string
    price: string
}

//Read thru .csv test data file found under testdata folder.
export async function readCSV(filePath: string): Promise<TestData[]> {
    return new Promise<TestData[]>((resolve, reject) => {
        const results: TestData[] = []
        fs.createReadStream(path.resolve(__dirname, '..', 'testdata', filePath))
            .pipe(csv()) // Read without headers to get raw rows
            .on('data', (data) => results.push(data as TestData))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error))
    })
}
