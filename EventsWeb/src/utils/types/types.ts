export interface UserProps {
  created_at: string | null;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
  uuid: string;
}

export interface FetchSingleUserDataProps {
  user?: UserProps | undefined | null;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch?: any;
}

export interface EventProps {
  archived_at: string | null;
  created_at: string | null;
  creator_uuid: string | null;
  description: string | null;
  event_category: string | null;
  event_date: string | null;
  event_location: string | null;
  id: number;
  image_url: string | null;
  tickets_number: number | null;
  title: string | null;
}
export interface FetchEventsProps {
  events?: EventProps[] | undefined | null;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch?: any;
}
