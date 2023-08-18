/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";

//CUSTOM IMPLEMENTAION OF INFIINTE SCROLL 
const usePaginationScroll = (
	data: any[],
	apiCall: (offset: number) => Promise<any[]>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<boolean>>
): usePaginationReturnType => {
	
	const [isPaginationLoading, setisPaginationLoading] =useState<boolean>(false);
	const [isPaginationComplete, setisPaginationComplete] = useState<boolean>(false);
	const [offset, setoffset] = useState<number>(0);
	const nodeRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		firstCall();
	}, []);

	useEffect(() => {
		initalCheck();
	}, [data]);

	async function firstCall() {
		const data = await apiCall(0);
		if (data.length === 0) setisPaginationComplete(true);
		setoffset(data.length);
		setLoading(false);
	}

	async function initalCheck() {
		if (data.length === 0 || isPaginationComplete) return;
		const scrollPresent = getIsScrollPresent();

		if (scrollPresent === false) {
			setisPaginationLoading(true);
			const data = await apiCall(data.length);
			if (data.length === 0) setisPaginationComplete(true);
			else setisPaginationComplete(false);
			setoffset(data.length);
			setisPaginationLoading(false);
		} else return;
	}

	const handleScroll = async (event: any) => {
		if (isPaginationComplete || isPaginationLoading) return;
		const scrollHeight = event.target.scrollHeight;
		const scrollTop = event.target.scrollTop;
		const clientHeight = event.target.clientHeight;

		if (clientHeight + scrollTop + 1 >= scrollHeight) {
			setisPaginationLoading(true);
			const data = await apiCall(data.length);

			if (data.length === 0) {
				setisPaginationComplete(true);
			}

			setoffset(data.length);
			setisPaginationLoading(false);
		}
	};

	const getIsScrollPresent = () => {
		if (nodeRef.current) {
			const clientHeight: number = nodeRef.current.clientHeight;
			const scrollHeight: number = nodeRef.current.scrollHeight;

			if (clientHeight < scrollHeight) return true;
			else return false;
		}
	};

	return {
		isPaginationLoading,
		nodeRef,
		handleScroll,
		setoffset,
	};
};

type usePaginationReturnType = {
	isPaginationLoading: boolean;
	nodeRef: React.MutableRefObject<HTMLInputElement>;
	handleScroll: (event: any) => Promise<void>;
	setoffset: React.Dispatch<React.SetStateAction<number>>;
};

export default usePaginationScroll;