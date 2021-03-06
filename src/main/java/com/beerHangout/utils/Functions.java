package com.beerHangout.utils;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.beerHangout.utils.Streams.asStream;

/**
 * @Author: WB
 * Nie moje, ale działa bardzo podobnie do funkcji map z JS
 */
public final class Functions {

    public static <T, V> List<V> map(final List<T> in, final Function<T, V> function) {
        return in == null ? null : map(in.stream(), function);
    }

    public static <T, V> List<V> map(final Stream<T> in, final Function<T, V> function) {
        return in == null ? null : in
                .map(function)
                .collect(Collectors.toList());
    }

    public static <T, V> List<V> map(final Iterable<T> in, final Function<T, V> function) {
        return map(asStream(in), function);
    }

}
