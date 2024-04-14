import create from 'zustand';

const adminFilterStorage = create((set, get) => ({
    payments: [],
    filteredPayments: [],
    searchText: "",
    showPaid: true,
    showPending: true,
    showCanceled: true,
    setShowPaid: (data) => {
        set({ showPaid: data })
        get().getFilteredPayments();
    },
    setShowPending: (data) => {
        set({ showPending: data })
        get().getFilteredPayments();
    },
    setShowCanceled: (data) => {
        set({ showCanceled: data })
        get().getFilteredPayments();
    },
    setPayments: (data) => set({ payments: data }),
    setSearchText: (data) => {
        set({ searchText: data });
        get().getFilteredPayments();
    },
    getFilteredPayments: () => {
        const { payments, showPaid, showPending, showCanceled, searchText } = get();
        let filtered = [];
        if (searchText === "" && showPaid && showPending && showCanceled) {
            filtered = payments;
        } else {
            filtered = payments.filter(payment => {
                const formattedSearchText = searchText.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
                const formattedForeignId = payment.foreign_id.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
                const formattedAmount = payment.amount.toString().replace(/[^a-zA-Z0-9]/g, '');
                const formattedRequisite = payment.requisite.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
            
                const hasForeignId = formattedForeignId.includes(formattedSearchText);
                const hasAmount = formattedAmount.includes(formattedSearchText);
                const hasRequisite = formattedRequisite.includes(formattedSearchText);
            
                const hasStatus = (showPaid && payment.status === 'paid') ||
                                  (showPending && payment.status === 'pending') ||
                                  (showCanceled && payment.status === 'canceled');
            
                if (searchText !== "") {
                    return (hasForeignId || hasAmount || hasRequisite) && hasStatus;
                } else {
                    return hasStatus;
                }
            });
            
            
        }
        set({ filteredPayments: filtered });
        return filtered;
    }
}));





export { adminFilterStorage };