import { TimersRepository } from "@/lib/db/entries";
import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import {
  GetEntriesForRangeBody,
  GetEntriesForRangeParsedBody,
} from "@/lib/interfaces/entries/interface";
import { Utils } from "@/lib/utils/index";

export const GET = withErrorHandling(async (request) => {
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  ) as unknown as GetEntriesForRangeBody;

  const { userId, startTime, endTime, entriesPerPage, currentPage } =
    Object.fromEntries(
      Object.entries(searchParams).map(([key, value]) => [
        key,
        key === "entriesPerPage"
          ? Utils.assertValidNumberWithFallback(value, 20)
          : key === "currentPage"
          ? Utils.assertValidNumberWithFallback(value, 0)
          : Utils.assertValidNumber(value),
      ])
    ) as unknown as GetEntriesForRangeParsedBody;

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new ClientFriendlyError("Not found", "User not found");
  }

  const { limit, skip } = Utils.pagesToLimits({
    entriesPerPage: entriesPerPage!,
    currentPage: currentPage!,
  });

  const entries = await TimersRepository.getEntriesForRange({
    userId,
    startTime,
    endTime,
    limit,
    skip,
  });

  return new Response(JSON.stringify({ success: true, data: entries }), {
    headers: { "Content-Type": "application/json" },
  });
});
