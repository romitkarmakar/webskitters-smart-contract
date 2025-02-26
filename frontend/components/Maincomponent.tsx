
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useweb3 } from "./providers/web3"
import { useEffect } from "react"

export function Maincomponent() {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 px-4 md:px-6">

      <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Buy/Sell</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="Enter amount" />
              </div>
              <div className="space-y-2">
                <Label>Live Price of Gold</Label>
                <p className="text-gray-700 dark:text-gray-300">1,200.00 USD</p>
              </div>
              <div className="space-y-2">
                <Label>Wallet Balance</Label>
                <p className="text-gray-700 dark:text-gray-300">10,000.00 USD</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="range">Investment Range (0% - 100%)</Label>
                <Input className="w-full" id="range" max="100" min="0" type="range" />
              </div>
              <div className="flex gap-4">
                <Button className="flex-1 bg-amber-500 text-white">Buy</Button>
                <Button className="flex-1 border-amber-500 text-amber-500" variant="outline">
                  Sell
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
      <section className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio & Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-01-10</TableCell>
                  <TableCell>Buy</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>$1,200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-01-09</TableCell>
                  <TableCell>Sell</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>$1,199.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-01-08</TableCell>
                  <TableCell>Buy</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>$1,198.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
