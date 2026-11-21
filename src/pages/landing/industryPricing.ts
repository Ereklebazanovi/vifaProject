// Display formatting is separate from the price strings used for structured data.
export function displayIndustryPrice(price: string, ka: boolean) {
  const amount = price.replace("₾", "").trim().replace(/\s*-\s*/g, "-");
  return amount.endsWith("+")
    ? ka ? `${amount.slice(0, -1).trim()} ₾-დან` : `From ${amount.slice(0, -1).trim()} ₾`
    : `${amount} ₾`;
}
