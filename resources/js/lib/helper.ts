import { VariantType, enqueueSnackbar } from "notistack"
import { unstable_batchedUpdates } from "react-dom";
import useUserStore from "../stores/user";
import { DateTime } from "luxon";

export const promiseFunction = async ({
  loading, setLoading, callback, successTitle = 'Thành công',
  showSuccessTitle = true, setError
}: {
  loading?: boolean,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  setError?: React.Dispatch<React.SetStateAction<string>>,
  callback: () => Promise<void>,
  successTitle?: string,
  showSuccessTitle?: boolean
}) => {
  try {
    if (loading) return
    if (typeof setLoading == "function")
      setLoading(true)

    await callback()
    
    if (showSuccessTitle) {
      let variant: VariantType = "success"
      enqueueSnackbar(successTitle, { variant })
    }
  } 
  catch (error: any) {
    let variant: VariantType = "error"
    let text = (typeof error?.message === "string") ? error.message : 'Có lỗi xảy ra, vui lòng thử lại sau'
    enqueueSnackbar(text, { variant })

    if (typeof setError == "function") {
      setError(error)
    }
  } 
  finally {
    if (typeof setLoading == "function") {
      setLoading(false)
    }
  }
}

export const Fetch = async (url: string, options?: RequestInit) => {
  const csrf = (document.head.querySelector("[name~=csrf-token][content]") as HTMLMetaElement).content || ''
  const accessToken = useUserStore.getState().accessToken
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
        "X-CSRF-Token": csrf,
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw response
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const getImage = (url: string) => {
  return `/storage/${url}`
}

export const formatTimeToCountDown = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60
  return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
}

export const formatTimeToString = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours} giờ `;
  }

  if (minutes > 0) {
    formattedTime += `${minutes} phút `;
  }

  if (seconds > 0 || formattedTime === '') {
    formattedTime += `${seconds} giây`;
  }

  return formattedTime.trim();
};

export const formatTime = (time: Date | string, format = 'dd/MM/yyyy HH:mm') => {
  const date = typeof time === "string" ? DateTime.fromISO(time) : DateTime.fromJSDate(time)
  return date.toFormat(format)
}