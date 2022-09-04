pragma ever-solidity >= 0.64.0;

contract Document {

    mapping (uint16 => string[]) _chapters;
    string[] _draft;

    function add_chapter(uint16 n) external {
        tvm.accept();
        _chapters[n] = _draft;
        delete _draft;
    }

    function discard() external {
        tvm.accept();
        delete _draft;
    }

    function show_draft() external view returns (string out) {
        return _view_chapter(_draft);
    }

    function add_line(string line) external {
        tvm.accept();
        _draft.push(line);
    }

    function show_chapter(uint16 n) external view returns (string out) {
        out = _view_chapter(_chapters[n]);

    }
    function _view_chapter(string[] lines) internal pure returns (string out) {
        out = "\t";
        for (string s: lines)
        out.append(s + "\n");
    }

    function show_all() external view returns (string out) {
        for ((uint16 n, string[] ch): _chapters)
        out.append(format("\n\tChapter {}\n", n) + _view_chapter(ch));
    }
}
