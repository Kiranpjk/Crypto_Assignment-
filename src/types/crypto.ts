export interface MarketCoin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | {
        times: number;
        currency: string;
        percentage: number;
    };
    last_updated: string;
}

export interface CoinDetail {
    id: string;
    symbol: string;
    name: string;
    description: {
        en: string;
    };
    links: {
        homepage: string[];
        blockchain_site: string[];
        official_forum_url: string[];
        chat_url: string[];
        announcement_url: string[];
        twitter_screen_name: string;
        facebook_username: string;
        telegram_channel_identifier: string;
        subreddit_url: string;
        repos_url: {
            github: string[];
            bitbucket: string[];
        };
    };
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_data: {
        current_price: { inr: number };
        total_value_locked: null | { inr: number };
        mcap_to_tvl_ratio: null | number;
        fdv_to_tvl_ratio: null | number;
        roi: null | {
            times: number;
            currency: string;
            percentage: number;
        };
        market_cap: { inr: number };
        market_cap_rank: number;
        fully_diluted_valuation: { inr: number };
        total_volume: { inr: number };
        high_24h: { inr: number };
        low_24h: { inr: number };
        price_change_24h: number;
        price_change_percentage_24h: number;
        price_change_percentage_7d: number;
        price_change_percentage_14d: number;
        price_change_percentage_30d: number;
        price_change_percentage_60d: number;
        price_change_percentage_200d: number;
        price_change_percentage_1y: number;
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        price_change_24h_in_currency: { inr: number };
        price_change_percentage_1h_in_currency: { inr: number };
        price_change_percentage_24h_in_currency: { inr: number };
        price_change_percentage_7d_in_currency: { inr: number };
        price_change_percentage_14d_in_currency: { inr: number };
        price_change_percentage_30d_in_currency: { inr: number };
        price_change_percentage_60d_in_currency: { inr: number };
        price_change_percentage_200d_in_currency: { inr: number };
        price_change_percentage_1y_in_currency: { inr: number };
        market_cap_change_24h_in_currency: { inr: number };
        market_cap_change_percentage_24h_in_currency: { inr: number };
        total_supply: number;
        max_supply: number;
        circulating_supply: number;
        sparkline_7d: {
            price: number[];
        };
        last_updated: string;
    };
    community_data: {
        facebook_likes: number;
        twitter_followers: number;
        reddit_average_posts_48h: number;
        reddit_average_comments_48h: number;
        reddit_subscribers: number;
        reddit_accounts_active_48h: number;
        telegram_channel_user_count: number;
    };
    developer_data: {
        forks: number;
        stars: number;
        subscribers: number;
        total_issues: number;
        closed_issues: number;
        pull_requests_merged: number;
        pull_request_contributors: number;
        code_additions_deletions_4_weeks: {
            additions: number;
            deletions: number;
        };
        commit_count_4_weeks: number;
        last_4_weeks_commit_activity_series: number[];
    };
    public_interest_stats: {
        alexa_rank: number | null;
        bing_matches: number | null;
    };
    status_updates: unknown[];
    last_updated: string;
}
