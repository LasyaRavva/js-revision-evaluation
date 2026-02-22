function createBankAccount(initialBalance = 0) {
    let balance = Number(initialBalance);
    const transactions = [];

    function logTransaction(type, amount) {
        transactions.push({
            type: type,
            amount: Number(amount),
            date: new Date().toISOString(),
            balanceAfter: balance
        })
    }

    return {
        deposit(amount){
            const depositAmount = Number(amount);
            if(isNaN(depositAmount) || depositAmount <= 0) {
                return {
                    success: false,
                    message: "Deposit amount must be a +ve number"
                }
            }

            balance += depositAmount;
            logTransaction("deposit", depositAmount);

            return {
                success: true,
                message: `successfully deposited $${depositAmount.toFixed(2)}`,
                newBalance: balance
            }
        },

        withdraw(amount) {
            const withdrawAmount = Number(amount);

            if(isNaN(withdrawAmount) || withdrawAmount <= 0) {
                return {
                    success: false,
                    message: "withdrawl amount must be a +ve number"
                }
            }

            if(withdrawAmount > balance) {
                return {
                    success: false,
                    message: `insufficient funds.current balance: $${balance.toFixed(2)}`
                }
            }

            balance -= withdrawAmount;
            logTransaction("withdrawl", withdrawAmount);

            return{
                success: true,
                message: `successfully withdraw $${withdrawAmount.toFixed(2)}`,
                newBalance: balance
            }
        },

        getBalance() {
            return balance;

        },

        getTransactionHistory() {
            return [...transactions];
        },

        reset() {
            balance = 0;
            transactions.length = 0;
            logTransaction("amount_reset", 0);
            return{ success: true, message: "account has been reset"};
        }
    }
}

if(require.main === module) {
    const myAccount = createBankAccount(500);

    console.log(myAccount.deposit(1000));
    console.log(myAccount.withdraw(200));
    console.log(myAccount.withdraw(5000));
    console.log(myAccount.deposit(-50));
    console.log(myAccount.deposit("abc"));
    console.log("current balance", myAccount.getBalance());

    console.log("\n transaction history");
    console.log(myAccount.getTransactionHistory());

}