import _ from 'lodash'
import { BarcodesLayoutProps } from './interfaces/BarcodesLayoutProps.interface'

export const barcodesLayoutProps: BarcodesLayoutProps = {
	notches: true,
	barcodeItems: _.range(60 * 1).map((v) => ({
		barcodeBase64:
			'iVBORw0KGgoAAAANSUhEUgAAAHsAAABJCAYAAAAddVnZAAAAHnRFWHRTb2Z0d2FyZQBid2lwLWpzLm1ldGFmbG9vci5jb21Tnbi0AAABz0lEQVR4nO3RMW7DAAwEQf3/00mTIjB05j5gisCIKB7Pnud5np+/v+ff5/Pv+eez5+X/z/c+n63Z5/7Keft8y3p7t/Qvs/Xut9/g6rcy1vd4+83WrddusNsMdji89mDvDNghCzbss3+ZwQ6H1x7snQE7ZMGGffYvM9jh8NqDvTNghyzYsM/+ZQY7HF57sHcG7JAFG/bZv8xgh8NrD/bOgB2yYMM++5cZ7HB47cHeGbBDFmzYZ/8ygx0Orz3YOwN2yIIN++xfZrDD4bUHe2fADlmwYZ/9ywx2OLz2YO8M2CELNuyzf5nBDofXHuydATtkwYZ99i8z2OHw2oO9M2CHLNiwz/5lBjscXnuwdwbskAUb9tm/zGCHw2sP9s6AHbJgwz77lxnscHjtwd4ZsEMWbNhn/zKDHQ6vPdg7A3bIgg377F9msMPhtQd7Z8AOWbBhn/3LDHY4vPZg7wzYIQs27LN/mcEOh9ce7J0BO2TBhn32LzPY4fDag70zYIcs2LDP/mUGOxxee7B3BuyQBRv22b/MYIfDaw/2zoAdsmDDPvuXGexweO3B3hmwQxZs2Gf/MoMdDq892DsDdsiCDfvsX2aww+G1B3tnwA5ZsL/s/wII/J1SVO7RQQAAAABJRU5ErkJggg==',
		barcodeNumber: '29480182001210',
	})),
	//  [
	// 	{
	// 		barcodeBase64:
	// 			'iVBORw0KGgoAAAANSUhEUgAAAHsAAABJCAYAAAAddVnZAAAAHnRFWHRTb2Z0d2FyZQBid2lwLWpzLm1ldGFmbG9vci5jb21Tnbi0AAABz0lEQVR4nO3RMW7DAAwEQf3/00mTIjB05j5gisCIKB7Pnud5np+/v+ff5/Pv+eez5+X/z/c+n63Z5/7Keft8y3p7t/Qvs/Xut9/g6rcy1vd4+83WrddusNsMdji89mDvDNghCzbss3+ZwQ6H1x7snQE7ZMGGffYvM9jh8NqDvTNghyzYsM/+ZQY7HF57sHcG7JAFG/bZv8xgh8NrD/bOgB2yYMM++5cZ7HB47cHeGbBDFmzYZ/8ygx0Orz3YOwN2yIIN++xfZrDD4bUHe2fADlmwYZ/9ywx2OLz2YO8M2CELNuyzf5nBDofXHuydATtkwYZ99i8z2OHw2oO9M2CHLNiwz/5lBjscXnuwdwbskAUb9tm/zGCHw2sP9s6AHbJgwz77lxnscHjtwd4ZsEMWbNhn/zKDHQ6vPdg7A3bIgg377F9msMPhtQd7Z8AOWbBhn/3LDHY4vPZg7wzYIQs27LN/mcEOh9ce7J0BO2TBhn32LzPY4fDag70zYIcs2LDP/mUGOxxee7B3BuyQBRv22b/MYIfDaw/2zoAdsmDDPvuXGexweO3B3hmwQxZs2Gf/MoMdDq892DsDdsiCDfvsX2aww+G1B3tnwA5ZsL/s/wII/J1SVO7RQQAAAABJRU5ErkJggg==',
	// 		barcodeNumber: '29480182001210',
	// 	},
	// ],
	// barcodesOnPage: '4*15',
	// pageAmount: 5,
	// barcodeBase64:
	// 	'iVBORw0KGgoAAAANSUhEUgAAAHsAAABJCAYAAAAddVnZAAAAHnRFWHRTb2Z0d2FyZQBid2lwLWpzLm1ldGFmbG9vci5jb21Tnbi0AAABz0lEQVR4nO3RMW7DAAwEQf3/00mTIjB05j5gisCIKB7Pnud5np+/v+ff5/Pv+eez5+X/z/c+n63Z5/7Keft8y3p7t/Qvs/Xut9/g6rcy1vd4+83WrddusNsMdji89mDvDNghCzbss3+ZwQ6H1x7snQE7ZMGGffYvM9jh8NqDvTNghyzYsM/+ZQY7HF57sHcG7JAFG/bZv8xgh8NrD/bOgB2yYMM++5cZ7HB47cHeGbBDFmzYZ/8ygx0Orz3YOwN2yIIN++xfZrDD4bUHe2fADlmwYZ/9ywx2OLz2YO8M2CELNuyzf5nBDofXHuydATtkwYZ99i8z2OHw2oO9M2CHLNiwz/5lBjscXnuwdwbskAUb9tm/zGCHw2sP9s6AHbJgwz77lxnscHjtwd4ZsEMWbNhn/zKDHQ6vPdg7A3bIgg377F9msMPhtQd7Z8AOWbBhn/3LDHY4vPZg7wzYIQs27LN/mcEOh9ce7J0BO2TBhn32LzPY4fDag70zYIcs2LDP/mUGOxxee7B3BuyQBRv22b/MYIfDaw/2zoAdsmDDPvuXGexweO3B3hmwQxZs2Gf/MoMdDq892DsDdsiCDfvsX2aww+G1B3tnwA5ZsL/s/wII/J1SVO7RQQAAAABJRU5ErkJggg==',
}
